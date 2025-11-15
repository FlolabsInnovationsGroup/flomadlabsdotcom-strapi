const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || 'YOUR_TOKEN_HERE';

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
};

async function cleanupDuplicates() {
  console.log('🧹 Cleaning up duplicate entries...\n');
  
  try {
    // Get all focus areas
    const focusAreasRes = await axios.get(`${STRAPI_URL}/api/focus-areas`, { headers });
    const focusAreas = focusAreasRes.data.data;
    
    // Keep only the first occurrence of each title, delete the rest
    const seen = new Set();
    const toDelete = [];
    
    for (const item of focusAreas) {
      if (seen.has(item.title)) {
        toDelete.push({ id: item.documentId, title: item.title, type: 'focus-area' });
      } else {
        seen.add(item.title);
      }
    }
    
    // Delete focus area duplicates
    for (const item of toDelete) {
      await axios.delete(`${STRAPI_URL}/api/focus-areas/${item.id}`, { headers });
      console.log(`✅ Deleted duplicate Focus Area: ${item.title}`);
    }
    
    // Get all technologies
    const techRes = await axios.get(`${STRAPI_URL}/api/technologies`, { headers });
    const technologies = techRes.data.data;
    
    seen.clear();
    toDelete.length = 0;
    
    for (const item of technologies) {
      if (seen.has(item.name)) {
        toDelete.push({ id: item.documentId, name: item.name, type: 'technology' });
      } else {
        seen.add(item.name);
      }
    }
    
    // Delete technology duplicates
    for (const item of toDelete) {
      await axios.delete(`${STRAPI_URL}/api/technologies/${item.id}`, { headers });
      console.log(`✅ Deleted duplicate Technology: ${item.name}`);
    }
    
    // Get all about projects
    const projectsRes = await axios.get(`${STRAPI_URL}/api/about-projects`, { headers });
    const projects = projectsRes.data.data;
    
    seen.clear();
    toDelete.length = 0;
    
    for (const item of projects) {
      if (seen.has(item.title)) {
        toDelete.push({ id: item.documentId, title: item.title, type: 'about-project' });
      } else {
        seen.add(item.title);
      }
    }
    
    // Delete about project duplicates
    for (const item of toDelete) {
      await axios.delete(`${STRAPI_URL}/api/about-projects/${item.id}`, { headers });
      console.log(`✅ Deleted duplicate About Project: ${item.title}`);
    }
    
    console.log('\n✨ Cleanup complete!');
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    process.exit(1);
  }
}

cleanupDuplicates();
