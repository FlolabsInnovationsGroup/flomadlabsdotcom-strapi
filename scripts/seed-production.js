const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'https://flomadlabsdotcom-strapi-production.up.railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const IMAGE_DIR = path.join(__dirname, '..', 'images');

console.log(`🚀 Seeding to: ${STRAPI_URL}`);

// Data arrays
const focusAreas = [
  { title: "AI & Robotics", description: "Advancing intelligent machines and automation.", link: "/ai-robotics", image: "aiandroboticspic.png" },
  { title: "AI Travel on Earth", description: "AI-powered travel solutions for Earth exploration.", link: "/ai-travel", image: "aitravelonearth.png" },
  { title: "Animal Vocalization", description: "Decoding the communication of animals.", link: "/animal-vocalization", image: "animalvocalization.png" },
  { title: "Education", description: "Experiential learning for advanced AI and robotics.", link: "/education", image: "education.png" },
];

const technologies = [
  { name: "Chief AIPO", description: "Conversational AI Platform Oracle", image: "chiefaipo.png", link: "/caipo" },
  { name: "EduCapsule", description: "Experiential learning for advanced AI", image: "education.png", link: "/education" },
  { name: "Mood Changer (People)", description: "AI-powered emotional support", image: "moodchanger.png", link: "/moodchanger-people" },
  { name: "Mood Changer (Pets)", description: "Emotional well-being for animals", image: "moodchangerpets.png", link: "/moodchanger-pets" },
  { name: "Transforming Healthcare", description: "AI-driven medical innovations", image: "transforming.png", link: "/healthcare" },
  { name: "Space", description: "AI applications in space exploration", image: "space.png", link: "/space" },
];

const aboutProjects = [
  { title: "Our Focus",description: "AI and robotics for real-world impact.", image: "ourfocuspicone.png", link: "/#focus", buttonText: "Learn More", buttonLink: "/#focus" },
  { title: "Technologies", description: "Innovative solutions for tomorrow.", image: "refiningpic.png", link: "/#technologies", buttonText: "Explore Tech", buttonLink: "/#technologies" },
  { title: "About Us", description: "Pioneering the future of intelligence.", image: "flolabssocial.png", link: "/#about", buttonText: "Our Story", buttonLink: "/#about" },
  { title: "Travel Innovations", description: "Smart travel through AI.", image: "travel.png", link: "/travel", buttonText: "Discover", buttonLink: "/travel" },
];

async function uploadImage(imagePath) {
  try {
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
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error.response?.data || error.message);
    throw error;
  }
}

async function seedProduction() {
  try {
    console.log('📸 Uploading images and creating content...\n');

    // Seed Focus Areas
    console.log('🎯 Creating Focus Areas...');
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
      console.log(`✅ ${focus.title}`);
    }

    // Seed Technologies
    console.log('\n💡 Creating Technologies...');
    for (const tech of technologies) {
      const imagePath = path.join(IMAGE_DIR, tech.image);
      const imageId = await uploadImage(imagePath);
      
      await axios.post(
        `${STRAPI_URL}/api/technologies`,
        {
          data: {
            name: tech.name,
            description: tech.description,
            image: imageId,
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
      console.log(`✅ ${tech.name}`);
    }

    // Seed About Projects
    console.log('\n📖 Creating About Projects...');
    for (const project of aboutProjects) {
      const imagePath = path.join(IMAGE_DIR, project.image);
      const imageId = await uploadImage(imagePath);
      
      await axios.post(
        `${STRAPI_URL}/api/about-projects`,
        {
          data: {
            title: project.title,
            description: project.description,
            image: imageId,
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
      console.log(`✅ ${project.title}`);
    }

    console.log('\n✅ Production seeding complete!');
    console.log(`\n🌐 API URL: ${STRAPI_URL}/api`);
    console.log(`📊 Created: ${focusAreas.length} focus areas, ${technologies.length} technologies, ${aboutProjects.length} about projects`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

seedProduction();
