import meraki

# Replace with your Meraki API key
meraki_api_key = "91827e9abc34e868af813bb69ce997048c968dc6"

# Initialize the Meraki Dashboard API client
dashboard = meraki.DashboardAPI(meraki_api_key)

def print_organizations_and_networks():
    try:
        # Fetch and print organizations
        organizations = dashboard.organizations.getOrganizations()
        print("Organizations:")
        for org in organizations:
            print(f"Org ID: {org['id']}, Name: {org['name']}")
            
            # Fetch and print networks for each organization
            try:
                networks = dashboard.organizations.getOrganizationNetworks(org['id'])
                print(f"\nNetworks for Organization '{org['name']}':")
                for network in networks:
                    print(f"Network ID: {network['id']}, Name: {network['name']}")
            except meraki.APIError as network_error:
                print(f"Error fetching networks for Organization '{org['name']}': {network_error}")

    except meraki.APIError as org_error:
        print(f"Error fetching organizations: {org_error}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    print_organizations_and_networks()
