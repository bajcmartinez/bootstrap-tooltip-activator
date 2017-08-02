import Ember from 'ember';
import layout from '../templates/components/bootstrap4-tooltip-activator';
import BootstrapTooltipActivatorMixin from '../mixins/bootstrap4-tooltip-activator';

export default Ember.Component.extend(BootstrapTooltipActivatorMixin, {
  layout: layout
});
