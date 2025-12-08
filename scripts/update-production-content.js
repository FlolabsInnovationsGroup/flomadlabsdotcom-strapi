const axios = require('axios');

const STRAPI_URL = 'https://flomadlabsdotcom-strapi-production.up.railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

const technologiesData = [
  { name: "CAIPO", description: "CAIPO is a comprehensive AI-powered platform designed to revolutionize how businesses operate. By integrating multiple AI capabilities, CAIPO creates intelligent workflows that adapt to your needs, streamline operations, and drive innovation across your organization." },
  { name: "MoodChanger - People & Pets", description: "MoodChanger is an innovative AI-driven platform designed to enhance emotional well-being for both humans and their pets. By analyzing behavioral patterns and environmental factors, our technology provides personalized interventions to improve mood and overall quality of life." },
  { name: "AI Travel", description: "Our AI Travel platform transforms how people explore the world by combining artificial intelligence with deep travel expertise. The system learns from individual preferences, analyzes countless travel options, and creates perfectly tailored experiences that match your unique travel style." },
  { name: "Animal Vocalization", description: "Our Animal Vocalization project uses advanced AI to decode and understand animal communication patterns. By analyzing vocalizations, body language, and contextual cues, we're building bridges between humans and animals, enabling better care, conservation, and companionship." },
  { name: "AI and Robotics", description: "At the intersection of artificial intelligence and robotics, we're developing next-generation systems that perceive, learn, and interact with the world in increasingly sophisticated ways. Our work spans from industrial automation to collaborative robots that work alongside humans." },
  { name: "AI + Robotics Education", description: "Our AI and Robotics Education program makes cutting-edge technology accessible to learners of all backgrounds. Through hands-on projects, interactive learning, and real-world applications, we're preparing the next generation of AI and robotics innovators." }
];

const aboutProjectsData = [
  { title: "Travel AI", description: "Our Travel AI initiative represents a groundbreaking approach to transforming the travel industry through advanced artificial intelligence. At the heart of this project is our commitment to creating intelligent, personalized travel experiences that anticipate and respond to individual needs and preferences." },
  { title: "Advanced AI & Robotics Education", description: "FloMad Labs is revolutionizing AI and robotics education by making cutting-edge technology accessible to learners of all ages. Our comprehensive educational approach combines hands-on experience with theoretical knowledge, creating a dynamic learning environment that prepares students for the future of technology." },
  { title: "CAIPO", description: "CAIPO (Comprehensive AI-Powered Operations) represents our flagship platform for enterprise artificial intelligence integration. This sophisticated system serves as a central nervous system for business operations, seamlessly connecting multiple AI capabilities to create a unified, intelligent workflow." },
  { title: "RoboCollective", description: "The RoboCollective initiative represents our vision for the future of collaborative robotics and artificial intelligence. This groundbreaking project creates a network of interconnected AI systems and robotic platforms that work together seamlessly to solve complex challenges across multiple domains." }
];

async function updateContent() {
  try {
    console.log('🔄 Updating production content...\n');

    // Update Technologies
    console.log('💡 Updating Technologies...');
    const techResponse = await axios.get(`${STRAPI_URL}/api/technologies`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });

    for (const update of technologiesData) {
      // Find matching technology by name (case-insensitive partial match)
      const tech = techResponse.data.data.find(t => {
        const tName = t.name?.toLowerCase() || '';
        const uName = update.name.toLowerCase();
        return tName.includes(uName.split(' - ')[0].toLowerCase()) || 
               uName.includes(tName.split(' - ')[0].toLowerCase());
      });
      
      if (tech) {
        await axios.put(
          `${STRAPI_URL}/api/technologies/${tech.documentId}`,
          {
            data: {
              name: update.name,
              description: update.description
            }
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`  ✅ ${update.name}`);
      } else {
        console.log(`  ⚠️  Not found: ${update.name}`);
      }
    }

    // Update About Projects
    console.log('\n📖 Updating About Projects...');
    const projectResponse = await axios.get(`${STRAPI_URL}/api/about-projects`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });

    for (const update of aboutProjectsData) {
      const project = projectResponse.data.data.find(p => 
        p.title?.toLowerCase().includes(update.title.toLowerCase()) ||
        update.title.toLowerCase().includes(p.title?.toLowerCase() || '')
      );
      
      if (project) {
        await axios.put(
          `${STRAPI_URL}/api/about-projects/${project.documentId}`,
          {
            data: {
              title: update.title,
              description: update.description
            }
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`  ✅ ${update.title}`);
      } else {
        console.log(`  ⚠️  Not found: ${update.title}`);
      }
    }

    console.log('\n✅ Content update complete!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

updateContent();
