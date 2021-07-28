import find from 'lodash/find';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.storages.objects.objects.object', {
    url: '/{containerId}',
    component: 'pciProjectStorageContainersContainer',
    resolve: {
      containerId: /* @ngInject */ ($transition$) =>
        $transition$.params().containerId,
      container: /* @ngInject */ (
        PciProjectStorageContainersService,
        projectId,
        containerId,
        containers,
      ) => {
        const container = find(
          containers,
          (container) => container.id === containerId,
        );
        return PciProjectStorageContainersService.getContainer(
          projectId,
          containerId,
          container.isHighPerfStorage,
        );
      },

      goBack: /* @ngInject */ (goToStorageContainers) => goToStorageContainers,

      goToStorageContainer: /* @ngInject */ (
        $rootScope,
        CucCloudMessage,
        $state,
        projectId,
        containerId,
      ) => (message = false, type = 'success') => {
        const reload = message && type === 'success';

        const promise = $state.go(
          'pci.projects.project.storages.objects.objects.object',
          {
            projectId,
            containerId,
          },
          {
            reload,
          },
        );

        if (message) {
          promise.then(() =>
            CucCloudMessage[type](
              message,
              'pci.projects.project.storages.containers.container',
            ),
          );
        }

        return promise;
      },
      refresh: /* @ngInject */ (goToStorageContainer) => goToStorageContainer,

      breadcrumb: /* @ngInject */ (container) => container.name,
    },
  });
};
