/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Documents = new Mongo.Collection('Documents');

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Documents.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  name: {
    type: String,
    label: 'name of the order.',
  },
  description: {
    type: String,
    label: 'description of the order.',
  },
  status: {
    type: Boolean,
    label: 'time delevery ?',
  }
});

Documents.attachSchema(Documents.schema);

export default Documents;
