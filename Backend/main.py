import logging
from fastapi import FastAPI, HTTPException, Request, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from meraki import DashboardAPI

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Global variable for Meraki dashboard API object
meraki_dashboard = None

@app.post("/set_api_key")
async def set_api_key(request: Request):
    global meraki_dashboard
    body = await request.json()
    api_key = body.get("api_key")

    logger.info(f"Received API Key request with key: {api_key}")

    if not api_key:
        logger.error("API key is missing")
        raise HTTPException(status_code=400, detail="API key is missing")

    meraki_dashboard = DashboardAPI(api_key=api_key, suppress_logging=True)
    logger.info("API Key set successfully")
    return {"message": "API Key set successfully"}

@app.get("/organizations")
async def get_organizations():
    if not meraki_dashboard:
        logger.error("API key is not set")
        raise HTTPException(status_code=400, detail="API key is not set")
    try:
        organizations = meraki_dashboard.organizations.getOrganizations()
        logger.info(f"Retrieved organizations: {organizations}")
        return organizations
    except Exception as e:
        logger.error(f"Error fetching organizations: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/networks/{org_id}")
async def get_networks(org_id: str):
    if not meraki_dashboard:
        raise HTTPException(status_code=400, detail="API key is not set")
    try:
        networks = meraki_dashboard.organizations.getOrganizationNetworks(organizationId=org_id, total_pages='all')
        return networks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/networks/details")
async def get_networks_details(request: Request):
    if not meraki_dashboard:
        raise HTTPException(status_code=400, detail="API key is not set")

    body = await request.json()
    network_ids = body.get("network_ids", [])
    all_clients_info = []

    for network_id in network_ids:
        try:
            clients = meraki_dashboard.networks.getNetworkClients(network_id, total_pages='all')
            devices = meraki_dashboard.networks.getNetworkDevices(network_id)

            for client in clients:
                device_info = next((device for device in devices if device['serial'] == client.get('recentDeviceSerial')), None)

                client_info = {
                    "client_mac": client.get("mac"),
                    "client_user_id": client.get("user"),
                    "client_timestamps": {
                        "first_seen": client.get("firstSeen"),
                        "last_seen": client.get("lastSeen")
                    },
                    "network_id": network_id,
                    "wap_name": device_info.get("name") if device_info else None,
                    "mr_device_name": device_info.get("model") if device_info else None
                }

                all_clients_info.append(client_info)
        except Exception as e:
            logger.error(f"Error fetching details for network {network_id}: {str(e)}")

    return all_clients_info




@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request {request.method} {request.url}")
    logger.info(f"Headers: {request.headers}")

    # This calls the actual route handler
    response = await call_next(request)

    logger.info(f"Response status: {response.status_code}")
    return response

