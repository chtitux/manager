import filter from 'lodash/filter';

export default class PciTrainingJobController {
  /* @ngInject */
  constructor(CucCloudMessage, CucRegionService, PciProjectTrainingJobService, $interval) {
    this.CucCloudMessage = CucCloudMessage;
    this.CucRegionService = CucRegionService;
    this.PciProjectTrainingJobService = PciProjectTrainingJobService;
    this.$interval = $interval;
  }

  $onDestroy() {
    if (this.interval !== null) {
      this.$interval.cancel(this.interval);
    }
  }

  $onInit() {
    this.loadData();
    this.loadMessages();
    this.interval = this.$interval(() => {
      this.loadData();
    }, 10000);
  }

  loadData() {
    return this.PciProjectTrainingJobService.getAll(this.projectId).then((jobs) => {
      if (!this.hasNonTerminalJob(jobs)) {
        this.$onDestroy();
      }
      this.jobList = jobs;
    });
  }

  hasNonTerminalJob(jobs) {
    return filter(jobs, x => x.isTerminal()).length > 0;
  }

  loadMessages() {
    this.messageHandler = this.CucCloudMessage.subscribe(
      'pci.projects.project.training.jobs',
      {
        onMessage: () => this.refreshMessages(),
      },
    );
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}
