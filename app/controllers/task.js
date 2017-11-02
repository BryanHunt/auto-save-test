import Controller from '@ember/controller';
import RSVP from 'rsvp';
import { task, timeout } from "ember-concurrency";
import { observer } from "@ember/object";

export default Controller.extend({
  autosaveEnabled: false,

  autosave: task(function * () {
    yield timeout(3000);
//    this.set('model.updatedOn', moment());
    this.get('model.comments').then(comments => RSVP.all(comments.invoke('save')).then(() => this.get('model').save()));
  }).restartable(),

  afterModel(model) {
    this.set('model', model);
  },

  modelChanged: observer('model.isDirty', function() {
    if(this.get('autosaveEnabled') && this.get('model.isDirty')) {
      window.console.log(this.get('model').changed());
      this.get('autosave').perform();
    }
  }),

  actions: {
    toggleAutosave() {
      this.set('autosaveEnabled', !this.get('autosaveEnabled'));
    },

    addComment() {
      this.get('model.comments').then(comments => comments.addObject(this.store.createRecord('comment')));
    },

    save() {
      this.get('model.comments').then(comments => RSVP.all(comments.invoke('save')).then(() => this.get('model').save()));
    }
  }
});
