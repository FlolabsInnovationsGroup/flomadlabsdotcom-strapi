const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const IMAGES_PATH = '/Users/elizabethstein/Projects/flomadlabsdotcom/public/images';

// You'll need to get your API token from Strapi admin
// Settings -> API Tokens -> Create new API Token (Full access)
const API_TOKEN = process.env.STRAPI_API_TOKEN || 'YOUR_TOKEN_HERE';

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
};

async function uploadImage(imagePath) {
  const axios = require('axios');
  const fileName = path.basename(imagePath);
  
  const formData = new FormData();
  formData.append('files', fs.createReadStream(imagePath), fileName);
  
  try {
    const response = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
      headers: {
        ...headers,
        ...formData.getHeaders(),
      },
    });
    
    console.log(`✅ Uploaded: ${fileName}`);
    return response.data[0]; // Returns the uploaded file object
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error.response?.data || error.message);
    throw error;
  }
}

async function createFocusArea(data) {
  const axios = require('axios');
  
  try {
    const response = await axios.post(`${STRAPI_URL}/api/focus-areas`, 
      { data },
      {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log(`✅ Created Focus Area: ${data.title}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating focus area:`, error.response?.data || error.message);
    throw error;
  }
}

async function createTechnology(data) {
  const axios = require('axios');
  
  try {
    const response = await axios.post(`${STRAPI_URL}/api/technologies`,
      { data },
      {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log(`✅ Created Technology: ${data.name}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating technology:`, error.response?.data || error.message);
    throw error;
  }
}

async function createAboutProject(data) {
  const axios = require('axios');
  
  try {
    const response = await axios.post(`${STRAPI_URL}/api/about-projects`,
      { data },
      {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log(`✅ Created About Project: ${data.title}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating about project:`, error.response?.data || error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting content seeding...\n');
  
  try {
    // Focus Areas
    console.log('📍 Creating Focus Areas...');
    const focusAreas = [
      { image: 'education.png', title: 'Education', description: 'Revolutionizing learning through AI-powered educational tools and platforms.', link: '/education' },
      { image: 'healthcare.png', title: 'Healthcare', description: 'Advancing medical research and patient care with cutting-edge AI.', link: '/healthcare' },
      { image: 'travel.png', title: 'Travel', description: 'Enhancing travel experiences with intelligent automation and personalization.', link: '/travel' },
      { image: 'space.png', title: 'Space', description: 'Advancing space exploration and travel with AI-driven technologies and innovation.', link: '/space' },
    ];
    
    for (const focus of focusAreas) {
      const imageFile = await uploadImage(path.join(IMAGES_PATH, focus.image));
      await createFocusArea({
        title: focus.title,
        description: focus.description,
        link: focus.link,
        coverImage: imageFile.id,
        publishedAt: new Date().toISOString(),
      });
    }
    
    // Technologies
    console.log('\n💻 Creating Technologies...');
    const technologies = [
      { image: 'caipotech.png', name: 'CAIPO', icon: 'FaBrain', description: 'Optimizing health and performance: personal and organizational growth.' },
      { image: 'transforming.png', name: 'MoodChanger for People', icon: 'FaHeart', description: 'Transforming your mood and health, one insight at a time.' },
      { image: 'forpets.png', name: 'MoodChanger for Pets', icon: 'FaPaw', description: 'Redefining pet wellness for better care.' },
      { image: 'aitravel.png', name: 'AI Travel on Earth and Beyond', icon: 'FaRocket', description: 'Conversational AI is changing the way we explore and travel the world.' },
      { image: 'animalvocalization.png', name: 'Animal Vocalization', icon: 'FaDog', description: 'Talking to your pets is about to become reality.' },
      { image: 'airoboticspics.jpg', name: 'AI and Robotics', icon: 'FaRobot', description: 'We are on the cusp of a revolution.' },
    ];
    
    for (const tech of technologies) {
      const imageFile = await uploadImage(path.join(IMAGES_PATH, tech.image));
      await createTechnology({
        name: tech.name,
        icon: tech.icon,
        description: tech.description,
        publishedAt: new Date().toISOString(),
      });
    }
    
    // About Projects
    console.log('\n📖 Creating About Projects...');
    const projects = [
      { image: 'conversationalai.png', title: 'Travel AI', description: 'Conversational AI for personalized trip planning.' },
      { image: 'aiagirobotics.png', title: 'Advanced AI & Robotics Education', description: 'Empowering learners through experiential learning.' },
      { image: 'caipo.png', title: 'Chief AI Productivity Officer (CAIPO)', description: 'Optimizing lifestyles through AI-driven IoT technologies.' },
      { image: 'robocollective2.png', title: 'RoboCollective', description: 'Your very own robot dealership franchise.' },
    ];
    
    for (const project of projects) {
      const imageFile = await uploadImage(path.join(IMAGES_PATH, project.image));
      await createAboutProject({
        title: project.title,
        description: project.description,
        image: imageFile.id,
        publishedAt: new Date().toISOString(),
      });
    }
    
    console.log('\n✨ All content created successfully!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
