import controller from './general-information.controller';
import template from './general-information.html';

export default {
  bindings: {
    allowedIps: '<',
    billingLink: '<',
    database: '<',
    getCurrentPlan: '<',
    getCurrentFlavor: '<',
    users: '<',
    goToAddNode: '<',
    goToDeleteNode: '<',
    goToAllowedIPs: '<',
    goToManagerUsers: '<',
    goToDeleteDatabase: '<',
    goToEditName: '<',
    goToUpgradePlan: '<',
    goToUpgradeVersion: '<',
    latestPlan: '<',
    latestVersion: '<',
    newDatabases: '<',
    pollDatabaseStatus: '<',
    privateNetwork: '<',
    projectId: '<',
    stopPollingDatabaseStatus: '<',
    stopPollingNodesStatus: '<',
    subnet: '<',
    trackDatabases: '<',
  },
  controller,
  template,
};
