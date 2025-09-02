# AI-Powered Todo Optimization Setup

This feature uses OpenAI's GPT-4o model to intelligently optimize your todos for Pomodoro sessions.

## Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" section
4. Create a new API key
5. Copy the API key (it starts with `sk-`)

### 2. Configure Environment Variables
1. Open your `.env.local` file
2. Add your OpenAI API key:
   ```bash
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Save the file
4. Restart your development server

### 3. Features

#### AI Optimization
- **Smart Time Adjustment**: AI adjusts estimated times based on complexity and priority
- **Priority-Based Ordering**: Automatically sorts todos by urgency and importance
- **Energy Level Matching**: Matches task complexity to your current energy level
- **Custom Breaks**: Suggests appropriate breaks between tasks
- **Session Optimization**: Ensures tasks fit well within Pomodoro sessions

#### Custom Break Types
- **Short Breaks (5 min)**: Quick stretches, eye rest, deep breathing
- **Long Breaks (15 min)**: Walks, meditation, exercise, creative activities
- **Category-Specific**: Different break suggestions based on task type

#### User Preferences
- **Energy Level**: Low, Medium, High
- **Session Length**: 15, 20, 25, 30, or 45 minutes
- **Date Ranges**: Today, This Week, This Month
- **Categories**: Work, Personal, Learning, Health, Creative

### 4. Usage

1. **Open Mobile Onboarding** on the Pomodoro page
2. **Navigate to Step 5** (AI-Powered Todo Optimization)
3. **Set your preferences**:
   - Current energy level
   - Preferred session length
   - Date ranges and categories
4. **Select todos** you want to work on
5. **Choose optimization method**:
   - **AI Optimize & Add**: Full AI optimization with custom breaks
   - **Add to Pomodoro**: Standard addition without AI optimization
6. **Enjoy your optimized Pomodoro session!**

### 5. Cost Considerations

- OpenAI API charges apply based on usage
- GPT-4o is used for optimization
- Each optimization request costs approximately $0.01-0.05
- Consider setting usage limits in your OpenAI account

### 6. Troubleshooting

#### API Key Issues
- Ensure `.env.local` is in your project root
- Restart development server after adding API key
- Check API key format (starts with `sk-`)

#### Optimization Failures
- AI optimization includes fallback to standard optimization
- Check browser console for error details
- Ensure stable internet connection

#### Performance
- AI optimization takes 2-5 seconds typically
- Loading state shows during optimization
- Results are cached in localStorage

### 7. Privacy & Security

- Todo data is sent to OpenAI for optimization
- No data is stored permanently by OpenAI
- Consider data sensitivity when using with work tasks
- API key should be kept secure and not committed to version control

## Support

For issues or questions about the AI optimization feature, check the browser console for error messages or contact the development team.
