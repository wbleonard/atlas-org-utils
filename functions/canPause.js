/*
 * Checks the provided project and cluster against a list of clusters that shouldn't be paused (getClsuters())
 * 
 * args:
 * project - Object
 * cluster - name
 * nopause - array of clusters from getClusters() (this call could now be moved here).
 */
exports = function(project, cluster, nopause){
  
    var canPause = true;
    if (cluster.indexOf('nopause') > -1) {
        canPause = false;
        console.log(`Not pausing ${project.name}/${cluster} because the name contains phrase: nopause`);
    }

    nopause.forEach((item) => {
        if (item.projectName == project.name && item.clusterName == cluster) {
            canPause = false;
            //log("info", `Not pausing ${item.projectName}/${item.clusterName} because it is whitelisted`);
            console.log('Not pausing ' + item.projectName + "/" + item.clusterName + " because it is whitelisted");
        }
    })

    return canPause;
};