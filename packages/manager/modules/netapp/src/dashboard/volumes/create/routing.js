const hitName = 'netapp::detail::volumes::volume::create';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('netapp.dashboard.volumes.create', {
    url: '/create',
    views: {
      modal: {
        component: 'ovhManagerNetAppCreateVolume',
      },
    },
    layout: 'modal',
    resolve: {
      goToVolumeDetails: /* @ngInject */ ($state, $translate, Alerter) => (
        volumeId,
        successMessage,
      ) =>
        $state
          .go('netapp.dashboard.volumes.volume.dashboard', {
            volumeId,
          })
          .then(() => {
            Alerter.success(successMessage);
          }),
      goBack: /* @ngInject */ (goToVolumes) => goToVolumes,
      protocolEnum: /* @ngInject */ (schema) =>
        schema.models['storage.ProtocolEnum'].enum,
      trackClick: /* @ngInject */ (atInternet) => () => {
        atInternet.trackClick({
          name: `${hitName}::confirm`,
          type: 'action',
        });
      },

      breadcrumb: () => null,
    },
    atInternet: {
      rename: hitName,
    },
  });
};
