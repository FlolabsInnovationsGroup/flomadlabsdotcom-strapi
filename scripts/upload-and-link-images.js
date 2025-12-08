const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'https://flomadlabsdotcom-strapi-production.up.railway.app';
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const IMAGE_DIR = path.join(__dirname, '..', 'images');

// Map content to images
const focusAreaImages = {
  'Education': 'education.png',
  'Healthcare': 'healthcare.png',
  'Travel': 'travel.png',
  'Space': 'space.png'
};

const technologyImages = {
  'CAIPO': 'caipotech.png',
  'MoodChanger - People & Pets': 'transforming.png',
  'AI Travel': 'aitravel.png',
  'Animal Vocalization': 'animalvocalization.png',
  'AI and Robotics': 'airoboticspics.jpg',
  'AI + Robotics Education': 'aiagirobotics.png'
};

const aboutProjectImages = {
  'Travel AI': 'conversationalai.png',
  'Advanced AI & Robotics Education': 'aiagirobotics.png',
  'CAIPO': 'caipo.png',
  'RoboCollective': 'robocollective2.png'
};

async function uploadImage(imagePath, imageName) {
  try {
    const formData = new FormData();
    const fileStream = fs.createReadStream(imagePath);
    formData.append('files', fileStream, imageName);
    
    const response = await axios.post(
      `${STRAPI_URL}/api/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${API_TOKEN}`
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );
    
    return response.data[0];
  } catch (error) {
    console.error(`Error uploading ${imageName}:`, error.response?.data?.error || error.message);
    throw error;
  }
}

async function linkImages() {
  try {
    console.log('📸 Uploading and linking images...\n');

    // Upload and link Focus Area images
    console.log('🎯 Focus Areas:');
    const focusAreasResponse = await axios.get(`${STRAPI_URL}/api/focus-areas`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });
    
    for (const focusArea of focusAreasResponse.data.data) {
      const imageName = focusAreaImages[focusArea.title];
      if (imageName) {
        const imagePath = path.join(IMAGE_DIR, imageName);
        if (fs.existsSync(imagePath)) {
          const uploadedImage = await uploadImage(imagePath, imageName);
          
          await axios.put(
            `${STRAPI_URL}/api/focus-areas/${focusArea.documentId}`,
            {
              data: {
                coverImage: uploadedImage.id
              }
            },
            {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(`  ✅ ${focusArea.title} → ${imageName}`);
        }
      }
    }

    // Upload and link Technology images
    console.log('\n💡 Technologies:');
    const technologiesResponse = await axios.get(`${STRAPI_URL}/api/technologies`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });
    
    for (const tech of technologiesResponse.data.data) {
      const imageName = technologyImages[tech.name];
      if (imageName) {
        const imagePath = path.join(IMAGE_DIR, imageName);
        if (fs.existsSync(imagePath)) {
          const uploadedImage = await uploadImage(imagePath, imageName);
          
          await axios.put(
            `${STRAPI_URL}/api/technologies/${tech.documentId}`,
            {
              data: {
                image: uploadedImage.id
              }
            },
            {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(`  ✅ ${tech.name} → ${imageName}`);
        }
      }
    }

    // Upload and link About Project images
    console.log('\n📖 About Projects:');
    const projectsResponse = await axios.get(`${STRAPI_URL}/api/about-projects`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` }
    });
    
    for (const project of projectsResponse.data.data) {
      const imageName = aboutProjectImages[project.title];
      if (imageName) {
        const imagePath = path.join(IMAGE_DIR, imageName);
        if (fs.existsSync(imagePath)) {
          const uploadedImage = await uploadImage(imagePath, imageName);
          
          await axios.put(
            `${STRAPI_URL}/api/about-projects/${project.documentId}`,
            {
              data: {
                image: uploadedImage.id
              }
            },
            {
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log(`  ✅ ${project.title} → ${imageName}`);
        }
      }
    }

    console.log('\n✅ All images uploaded and linked!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

linkImages();
