// This script can be run in the browser console to clear localStorage
(() => {
  try {
    // Save current items count for reporting
    const itemCount = localStorage.length;
    const itemKeys = Object.keys(localStorage);
    
    // Clear all localStorage items
    localStorage.clear();
    
    console.log('🧹 localStorage cleared successfully!');
    console.log('📊 ' + itemCount + ' items removed: ' + itemKeys.join(', '));
    
    return true;
  } catch (error) {
    console.error('❌ Error clearing localStorage:', error);
    return false;
  }
})(); 