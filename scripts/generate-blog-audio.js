const fs = require('fs');
const path = require('path');
const https = require('https');

// Blog content to convert to audio
const blogContent = `
Human-Machine Cognition Collaboration.

Being interviewed by OpenAI to be featured in the intro video for the historic Dev Day presentation was inspiring. It was an opportunity to demonstrate the future of human-machine cognition collaboration, where AI augments rather than replaces human intelligence to solve complex challenges.

Interviewed to Represent the Future.

November 6, 2023, marked a pivotal moment in artificial intelligence history. OpenAI's first Dev Day brought together hundreds of developers from around the world to San Francisco, creating what many called "the biggest day for AI since the launch of GPT-4 in April." As a startup founder focused on neurodivergent education, being interviewed by OpenAI to appear in the Dev Day presentation intro video felt both humbling and inspiring.

The interview process itself was meaningful. OpenAI was looking for how their technology was being used, particularly those creating tangible impact across different sectors. Being interviewed to be part of this historic moment meant our work at Tekimax exemplified how OpenAI's tools could be applied to tackle genuine challenges and drive innovation.

The Announcements That Changed Everything.

Three key announcements stood out as game-changers for our work at Tekimax:

GPT-4 Turbo: More Capable, More Affordable.
The introduction of GPT-4 Turbo with 3x cheaper input tokens and 2x cheaper output tokens suddenly made advanced AI accessible to startups like ours. This wasn't just about cost, it was about possibility.

Custom GPTs: AI for Everyone.
The GPT Store concept introduced what OpenAI called "an app store for AI." For us in education technology, this represented a future where specialized AI tutors for neurodivergent students could be shared, improved, and scaled globally.

Assistants API: From Chat to Action.
Perhaps most exciting was the Assistants API, OpenAI's first agent-oriented product. This opened possibilities for AI that could not just converse but take action, particularly relevant for our adaptive learning platforms.

Agentic AI and Human Cognition Augmentation.

At Tekimax, we've always believed that artificial intelligence should augment human cognition rather than replace it. The advances announced at Dev Day validated this vision of human-machine collaboration and provided the tools to create agentic experiences that enhance critical thinking.

Our focus on building technology for good takes on new dimensions with these capabilities. Imagine AI agents that collaborate with human intelligence to solve complex problems, adapting to cognitive patterns and enhancing decision-making processes. The 128K context window means these systems can maintain awareness of entire problem-solving journeys, providing contextual support that augments rather than replaces human insight.

The democratization of AI isn't just about making tools available, it's about creating human-machine collaboration that empowers diverse communities. Technology should augment human cognition and critical thinking, especially for neurodivergent individuals who bring unique perspectives to problem-solving.

Using AI Technology to Solve Real Problems.

Watching the live stream as the OpenAI team unveiled the future, knowing that our story was part of that presentation, I was struck by the responsibility that comes with access to such powerful technology. As startups using OpenAI's tools, we're not just building products, we're demonstrating how AI can address genuine challenges across various industries and create meaningful impact.

The pace of innovation is breathtaking. What were research projects just months ago became developer-ready APIs that day. But with great power comes great responsibility: ensuring these advances serve not just efficiency but meaningful impact, addressing complex challenges that benefit diverse communities and use cases.

The Future of Human-AI Collaboration.

Dev Day reminded us that we're not just witnessing the AI revolution, we're actively shaping the future of human-machine cognition collaboration. Every agentic experience we create, every critical thinking enhancement we build, is part of this larger transformation toward technology for good.

Our passion for exploring the cutting edge of AI discovery isn't just about technology, it's about augmenting human potential. The cognitive partnerships we foster, the neurodivergent community we support, and the collaborative systems we build are all part of a future where artificial intelligence amplifies human intelligence and critical thinking rather than replacing it.

Being interviewed to be part of OpenAI's first Dev Day presentation was inspiring and a validation of our vision for human-machine cognition collaboration. It was an opportunity to showcase our commitment to building technology for good, creating agentic AI experiences that augment critical thinking and support the neurodivergent community we serve without replacing human intelligence.

As we continue building at Tekimax, being interviewed to demonstrate human-machine cognition collaboration drives our mission forward. We're not just developing AI solutions; we're pioneering agentic experiences that prove how technology can augment human intelligence, enhance critical thinking, and create meaningful impact for neurodivergent communities and beyond.
`;

async function generateAudio() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY not found in environment variables');
    process.exit(1);
  }

  const data = JSON.stringify({
    model: 'tts-1',
    voice: 'nova', // Options: alloy, echo, fable, onyx, nova, shimmer
    input: blogContent,
    speed: 1.0
  });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/audio/speech',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  console.log('Generating audio for blog post...');

  const outputPath = path.join(__dirname, '..', 'public', 'blog-audio-openai-devday.mp3');
  const fileStream = fs.createWriteStream(outputPath);

  const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    
    if (res.statusCode !== 200) {
      console.error(`Error: ${res.statusCode}`);
      res.on('data', (chunk) => {
        console.error(chunk.toString());
      });
      return;
    }

    res.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Audio file saved to: ${outputPath}`);
      console.log('Audio generation complete!');
    });
  });

  req.on('error', (error) => {
    console.error('Error generating audio:', error);
  });

  req.write(data);
  req.end();
}

generateAudio();