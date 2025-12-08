const axios = require('axios');

const STRAPI_URL = 'https://flomadlabsdotcom-strapi-production.up.railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

const focusAreas = [
  { title: "Education", description: "Revolutionizing learning through AI-powered educational tools and platforms.", link: "/education" },
  { title: "Healthcare", description: "Advancing medical research and patient care with cutting-edge AI.", link: "/healthcare" },
  { title: "Travel", description: "Enhancing travel experiences with intelligent automation and personalization.", link: "/travel" },
  { title: "Space", description: "Advancing space exploration and travel with AI-driven technologies and innovation.", link: "/space" }
];

const technologies = [
  { name: "CAIPO", description: "CAIPO is a comprehensive AI-powered platform designed to revolutionize how businesses operate. By integrating multiple AI capabilities, CAIPO creates intelligent workflows that adapt to your needs, streamline operations, and drive innovation across your organization.", link: "/caipo" },
  { name: "MoodChanger - People & Pets", description: "MoodChanger is an innovative AI-driven platform designed to enhance emotional well-being for both humans and their pets. By analyzing behavioral patterns and environmental factors, our technology provides personalized interventions to improve mood and overall quality of life.", link: "/moodchanger" },
  { name: "AI Travel", description: "Our AI Travel platform transforms how people explore the world by combining artificial intelligence with deep travel expertise. The system learns from individual preferences, analyzes countless travel options, and creates perfectly tailored experiences that match your unique travel style.", link: "/ai-travel" },
  { name: "Animal Vocalization", description: "Our Animal Vocalization project uses advanced AI to decode and understand animal communication patterns. By analyzing vocalizations, body language, and contextual cues, we're building bridges between humans and animals, enabling better care, conservation, and companionship.", link: "/animal-vocalization" },
  { name: "AI and Robotics", description: "At the intersection of artificial intelligence and robotics, we're developing next-generation systems that perceive, learn, and interact with the world in increasingly sophisticated ways. Our work spans from industrial automation to collaborative robots that work alongside humans.", link: "/ai-robotics" },
  { name: "AI + Robotics Education", description: "Our AI and Robotics Education program makes cutting-edge technology accessible to learners of all backgrounds. Through hands-on projects, interactive learning, and real-world applications, we're preparing the next generation of AI and robotics innovators.", link: "/education" }
];

const aboutProjects = [
  { title: "Travel AI", description: "Our Travel AI initiative represents a groundbreaking approach to transforming the travel industry through advanced artificial intelligence. At the heart of this project is our commitment to creating intelligent, personalized travel experiences that anticipate and respond to individual needs and preferences.", link: "https://www.flomadtravel.com/", buttonText: "Visit Site", buttonLink: "https://www.flomadtravel.com/" },
  { title: "Advanced AI & Robotics Education", description: "FloMad Labs is revolutionizing AI and robotics education by making cutting-edge technology accessible to learners of all ages. Our comprehensive educational approach combines hands-on experience with theoretical knowledge, creating a dynamic learning environment that prepares students for the future of technology.", link: "https://flomad.international/", buttonText: "Visit Site", buttonLink: "https://flomad.international/" },
  { title: "CAIPO", description: "CAIPO (Comprehensive AI-Powered Operations) represents our flagship platform for enterprise artificial intelligence integration. This sophisticated system serves as a central nervous system for business operations, seamlessly connecting multiple AI capabilities to create a unified, intelligent workflow.", link: "https://www.caipo.ai/", buttonText: "Visit Site", buttonLink: "https://www.caipo.ai/" },
  { title: "RoboCollective", description: "The RoboCollective initiative represents our vision for the future of collaborative robotics and artificial intelligence. This groundbreaking project creates a network of interconnected AI systems and robotic platforms that work together seamlessly to solve complex challenges across multiple domains.", link: "https://www.robocollective.ai/", buttonText: "Visit Site", buttonLink: "https://www.robocollective.ai/" }
];

async function seedContentOnly() {
  try {
    console.log('🌱 Seeding production content (no images)...\n');

    // Create Focus Areas
    console.log('🎯 Creating Focus Areas...');
    for (const focus of focusAreas) {
      await axios.post(
        `${STRAPI_URL}/api/focus-areas`,
        {
          data: {
            title: focus.title,
            description: focus.description,
            link: focus.link,
            publishedAt: new Date().toISOString()
          }
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`  ✅ ${focus.title}`);
    }

    // Create Technologies
    console.log('\n💡 Creating Technologies...');
    for (const tech of technologies) {
      await axios.post(
        `${STRAPI_URL}/api/technologies`,
        {
          data: {
            name: tech.name,
            description: tech.description,
            link: tech.link,
            publishedAt: new Date().toISOString()
          }
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`  ✅ ${tech.name}`);
    }

    // Create About Projects
    console.log('\n📖 Creating About Projects...');
    for (const project of aboutProjects) {
      await axios.post(
        `${STRAPI_URL}/api/about-projects`,
        {
          data: {
            title: project.title,
            description: project.description,
            link: project.link,
            buttonText: project.buttonText,
            buttonLink: project.buttonLink,
            publishedAt: new Date().toISOString()
          }
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`  ✅ ${project.title}`);
    }

    console.log('\n✅ Content seeding complete!');
    console.log(`\n📊 Created: ${focusAreas.length} focus areas, ${technologies.length} technologies, ${aboutProjects.length} about projects`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

seedContentOnly();
