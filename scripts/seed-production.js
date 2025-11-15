const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = process.env.RAILWAY_STRAPI_URL || 'https://flomadlabsdotcom-strapi-production.up.railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const IMAGE_DIR = path.join(__dirname, '../images');

console.log(`🚀 Seeding to: ${STRAPI_URL}`);

const focusAreas = [
  { title: "Education", description: "Experiential learning for advanced AI and robotics.", link: "/education", image: "education_new2.png" },
  { title: "Healthcare", description: "AI-powered insights for better health and wellness.", link: "/healthcare", image: "health2.png" },
  { title: "Travel", description: "Conversational AI transforming trip planning.", link: "/travel", image: "conversational1.png" },
  { title: "Space", description: "Advancing space exploration through AI research.", link: "/space", image: "space1.png" }
];

const technologies = [
  { name: "CAIPO", description: "Optimizing health and performance: personal and organizational growth.", link: "/caipo", image: "caipotech.png" },
  { name: "MoodChanger for People", description: "Transforming your mood and health, one insight at a time.", link: "/moodchanger-people", image: "transforming.png" },
  { name: "MoodChanger for Pets", description: "Redefining pet wellness for better care.", link: "/moodchanger-pets", image: "forpets.png" },
  { name: "AI Travel on Earth and Beyond", description: "Conversational AI is changing the way we explore and travel the world.", link: "/ai-travel", image: "aitravel.png" },
  { name: "Animal Vocalization", description: "Talking to your pets is about to become reality.", link: "/animal-vocalization", image: "animalvocalization.png" },
  { name: "AI and Robotics", description: "We are on the cusp of a revolution.", link: "/ai-robotics", image: "airoboticspics.jpg" }
];

const aboutProjects = [
  { title: "Travel AI", description: "Conversational AI for personalized trip planning.", link: "https://www.flomadtravel.com/", buttonText: "Visit Site", buttonLink: "https://www.flomadtravel.com/", image: "conversationalai.png" },
  { title: "Advanced AI & Robotics Education", description: "Empowering learners through experiential learning.", link: "https://flomad.international/", buttonText: "Visit Site", buttonLink: "https://flomad.international/", image: "aiagirobotics.png" },
  { title: "Chief AI Productivity Officer (CAIPO)", description: "Optimizing lifestyles through AI-driven IoT technologies.", link: "https://www.caipo.ai/", buttonText: "Visit Site", buttonLink: "https://www.caipo.ai/", image: "caipo.png" },
  { title: "RoboCollective", description: "Your very own robot dealership franchise.", link: "https://www.robocollective.ai/", buttonText: "Visit Site", buttonLink: "https://www.robocollective.ai/", image: "robocollective2.png" }
];

async function uploadImage(imagePath) {
  const formData = new FormData();
  formData.append('files', fs.createReadStream(imagePath));
  
  const response = await axios.post(
    `${STRAPI_URL}/api/upload`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${API_TOKEN}`
      }
    }
  );
  
  return response.data[0].id;
}

async function seedProduction() {
  try {
    console.log('📸 Uploading images and creating content...\n');

    // Seed Focus Areas
    for (const focus of focusAreas) {
      const imagePath = path.join(IMAGE_DIR, focus.image);
      const imageId = await uploadImage(imagePath);
      
      await axios.post(
        `${STRAPI_URL}/api/focus-areas`,
        {
          data: {
            title: focus.title,
            description: focus.description,
            link: focus.link,
            coverImage: imageId,
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
      console.log(`✅ Created Focus Area: ${focus.title}`);
    }

    // Seed Technologies
    for (const tech of technologies) {
      const imagePath = path.join(IMAGE_DIR, tech.image);
      const imageId = await uploadImage(imagePath);
      
      await axios.post(
        `${STRAPI_URL}/api/technologies`,
        {
          data: {
            name: tech.name,
            description: tech.description,
            link: tech.link,
            image: imageId,
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
      console.log(`✅ Created Technology: ${tech.name}`);
    }

    // Seed About Projects
    for (const project of aboutProjects) {
      const imagePath = path.join(IMAGE_DIR, project.image);
      const imageId = await uploadImage(imagePath);
      
      await axios.post(
        `${STRAPI_URL}/api/about-projects`,
        {
          data: {
            title: project.title,
            description: project.description,
            link: project.link,
            buttonText: project.buttonText,
            buttonLink: project.buttonLink,
            image: imageId,
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
      console.log(`✅ Created About Project: ${project.title}`);
    }

    console.log('\n✨ Production seeding complete!');
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

seedProduction();
