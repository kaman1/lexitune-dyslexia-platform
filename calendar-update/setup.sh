#!/bin/bash

# Outlook Calendar MCP Setup Script

echo "Outlook Calendar MCP Setup"
echo "=========================="
echo ""

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
    CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    OS="Windows"
    CONFIG_PATH="$APPDATA/Claude/claude_desktop_config.json"
else
    OS="Linux"
    CONFIG_PATH="$HOME/.config/Claude/claude_desktop_config.json"
fi

echo "Detected OS: $OS"
echo ""

# Menu selection
echo "Select MCP Server to install:"
echo "1) Outlook Calendar MCP (Windows only - Local Outlook)"
echo "2) Microsoft 365 MCP Server (Cross-platform - Graph API)"
echo "3) Outlook MCP via Graph API (Cross-platform)"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "Installing Outlook Calendar MCP..."
        npm install outlook-calendar-mcp
        
        # Create config
        cat > claude-config.json << 'EOF'
{
  "mcpServers": {
    "outlook-calendar": {
      "command": "npx",
      "args": ["outlook-calendar-mcp"]
    }
  }
}
EOF
        echo "Configuration saved to claude-config.json"
        echo "Please copy this to: $CONFIG_PATH"
        ;;
        
    2)
        echo "Installing Microsoft 365 MCP Server..."
        npm install @softeria/ms-365-mcp-server
        
        # Prompt for Azure credentials
        read -p "Enter Azure Client ID: " client_id
        read -p "Enter Azure Tenant ID: " tenant_id
        read -s -p "Enter Azure Client Secret: " client_secret
        echo ""
        
        # Create .env file
        cat > .env << EOF
AZURE_CLIENT_ID=$client_id
AZURE_TENANT_ID=$tenant_id
AZURE_CLIENT_SECRET=$client_secret
EOF
        
        # Create config
        cat > claude-config.json << EOF
{
  "mcpServers": {
    "ms365": {
      "command": "npx",
      "args": ["@softeria/ms-365-mcp-server"],
      "env": {
        "AZURE_CLIENT_ID": "$client_id",
        "AZURE_TENANT_ID": "$tenant_id",
        "AZURE_CLIENT_SECRET": "$client_secret"
      }
    }
  }
}
EOF
        echo "Configuration saved to claude-config.json and .env"
        echo "Please copy claude-config.json to: $CONFIG_PATH"
        ;;
        
    3)
        echo "Installing Outlook MCP via Graph API..."
        npm install outlook-mcp
        
        # Prompt for Azure credentials
        read -p "Enter Azure Client ID: " client_id
        read -p "Enter Azure Tenant ID: " tenant_id
        read -s -p "Enter Azure Client Secret: " client_secret
        echo ""
        
        # Create config
        cat > claude-config.json << EOF
{
  "mcpServers": {
    "outlook-mcp": {
      "command": "npx",
      "args": ["outlook-mcp"],
      "env": {
        "AZURE_CLIENT_ID": "$client_id",
        "AZURE_TENANT_ID": "$tenant_id",
        "AZURE_CLIENT_SECRET": "$client_secret"
      }
    }
  }
}
EOF
        echo "Configuration saved to claude-config.json"
        echo "Please copy this to: $CONFIG_PATH"
        ;;
        
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy the configuration to Claude's config file"
echo "2. Restart Claude Desktop"
echo "3. The MCP server should be available in Claude"