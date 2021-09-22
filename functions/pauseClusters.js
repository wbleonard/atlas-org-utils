/*
 * Iterates over the projects and clusters in this org (SA-SOUTHEST-FED_MA_SE), pausing those that are not on the no pause list.
 */
exports = async function(pause){
  
  if (typeof pause == 'undefined') {
    pause = true    // The trigger can't pass an argument.
  }
  
  const projects = await context.functions.execute("getProjects");
  
  const no_pause_clusters = await context.functions.execute("getClusters");
  
  projects.forEach(async project => {
    
    const clusters = await context.functions.execute("getProjectClusters", project.id);
    
    clusters.forEach(async cluster => {
      
      can_pause =  await context.functions.execute("canPause", project, cluster.name, no_pause_clusters);
      
      if (can_pause) {
        console.log(`Pausing ${project.name}:${cluster.name}`);  
        await context.functions.execute("pauseCluster", project.id, cluster.name, pause);
      } else {
        console.log(`*** Skipping pause for ${project.name}:${cluster.name} ***`);
      }
    });
  });
  
  return true;

};