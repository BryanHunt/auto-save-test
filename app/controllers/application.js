import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  db: computed('refreshDb', function() {
    let dump = window.server.schema.db.dump();

    return JSON.stringify(dump, null, 2);
  }),

  actions: {
    refreshDb() {
      this.incrementProperty('refreshDb');
    }
  }
});
