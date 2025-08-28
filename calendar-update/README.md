# Outlook Calendar MCP Setup

## Available MCP Servers for Outlook Calendar

### Option 1: Outlook Calendar MCP (Windows Only)
**Repository:** https://github.com/merajmehrabi/Outlook_Calendar_MCP

Features:
- View calendar events within date ranges
- Create and manage events and meetings
- Check attendee status
- Find free time slots
- Support for multiple calendars

### Option 2: Microsoft 365 MCP Server (Cross-platform)
**Repository:** https://github.com/softeria/ms-365-mcp-server

Features:
- Full Microsoft 365 suite integration
- Calendar operations via Graph API
- Email, files, and calendar access
- OAuth authentication

### Option 3: Outlook MCP via Graph API (Cross-platform)
**Repository:** https://github.com/ryaker/outlook-mcp

Features:
- Calendar and email functionality
- Microsoft Graph API integration
- Requires Azure app registration

## Installation Steps

### For Windows Users (Local Outlook Access)

1. Install the Outlook Calendar MCP:
```bash
npm install outlook-calendar-mcp
```

2. Configure Claude Desktop:
Edit your Claude Desktop configuration file:
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

Add the MCP server configuration:
```json
{
  "mcpServers": {
    "outlook-calendar": {
      "command": "npx",
      "args": ["outlook-calendar-mcp"]
    }
  }
}
```

### For Cross-platform (Graph API)

1. Register an Azure App:
   - Go to Azure Portal (https://portal.azure.com)
   - Navigate to Azure Active Directory > App registrations
   - Create new registration
   - Note the Application (client) ID and Directory (tenant) ID

2. Set up permissions:
   - Add Microsoft Graph API permissions:
     - Calendars.ReadWrite
     - Mail.ReadWrite
     - User.Read

3. Install the MCP server:
```bash
npm install @softeria/ms-365-mcp-server
```

4. Configure environment variables:
Create a `.env` file:
```
AZURE_CLIENT_ID=your-client-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_SECRET=your-client-secret
```

5. Update Claude configuration:
```json
{
  "mcpServers": {
    "ms365": {
      "command": "npx",
      "args": ["@softeria/ms-365-mcp-server"],
      "env": {
        "AZURE_CLIENT_ID": "your-client-id",
        "AZURE_TENANT_ID": "your-tenant-id",
        "AZURE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

## Usage Examples

Once configured, you can use natural language commands in Claude:

- "Show my calendar events for next week"
- "Schedule a meeting for tomorrow at 2 PM"
- "Find free time slots between 9 AM and 5 PM"
- "Create a recurring weekly meeting"
- "Update the meeting on Friday to 3 PM"
- "Cancel all meetings for today"

## Troubleshooting

1. **Authentication Issues**: Ensure your Azure app has proper permissions
2. **Connection Errors**: Check firewall settings and network connectivity
3. **Permission Denied**: Run with administrator privileges if needed
4. **Server Not Found**: Verify the MCP server is properly installed

## Security Notes

- All operations are performed locally or via secure OAuth
- Credentials are stored securely in your local configuration
- No calendar data is sent to external servers (except Microsoft's own servers)
- Use environment variables for sensitive information