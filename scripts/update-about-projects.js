const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

const projectUpdates = [
  {
    title: "Travel AI",
    link: "https://www.flomadtravel.com/",
    buttonText: "Visit Site",
    buttonLink: "https://www.flomadtravel.com/"
  },
  {
    title: "Advanced AI & Robotics Education",
    link: "https://flomad.international/",
    buttonText: "Visit Site",
    buttonLink: "https://flomad.international/"
  },
  {
    title: "Chief AI Productivity Officer (CAIPO)",
    link: "https://www.caipo.ai/",
    buttonText: "Visit Site",
    buttonLink: "https://www.caipo.ai/"
  },
  {
    title: "RoboCollective",
    link: "https://www.robocollective.ai/",
    buttonText: "Visit Site",
    buttonLink: "https://www.robocollective.ai/"
  }
];

async function updateProjects() {
  try {
    // Get all projects
    const response = await axios.get(`${STRAPI_URL}/api/about-projects`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    const projects = response.data.data;

    // Update each project with the new fields
    for (const update of projectUpdates) {
      const project = projects.find(p => p.title === update.title);
      
      if (project) {
        await axios.put(
          `${STRAPI_URL}/api/about-projects/${project.documentId}`,
          {
            data: {
              link: update.link,
              buttonText: update.buttonText,
              buttonLink: update.buttonLink
            }
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`✅ Updated: ${update.title}`);
      } else {
        console.log(`❌ Not found: ${update.title}`);
      }
    }

    console.log('\n✨ All projects updated!');
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

updateProjects();
