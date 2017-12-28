/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, Radio } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class DocumentEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        name: {
          required: true,
        },
        description: {
          required: true,
        },
      },
      messages: {
        name: {
          required: 'Need a name in here, Seuss.',
        },
        description: {
          required: 'This thneeds a description, please.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingDocument = this.props.doc && this.props.doc._id;
    const methodToCall = existingDocument ? 'documents.update' : 'documents.insert';
    const doc = {
      name: this.name.value.trim(),
      description: this.description.value.trim(),
      status: this.status.checked
    };

    console.log(doc.status)

    if (existingDocument) doc._id = existingDocument;

    Meteor.call(methodToCall, doc, (error, documentId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/documents/${documentId}`);
      }
    });
  }

  render() {
    const { doc } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Order Name:</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="name"
            ref={name => (this.name = name)}
            defaultValue={doc && doc.name}
            placeholder="Order name"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Order Description</ControlLabel>
          <textarea
            className="form-control"
            name="description"
            ref={description => (this.description = description)}
            defaultValue={doc && doc.description}
            placeholder="Order details"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Time Delivery</ControlLabel>
          <ControlLabel className="statuslbl">
            <input
            defaultChecked={doc.status}
            ref={status => (this.status = status)}
            type="radio"
            name="status"/>Yes
          </ControlLabel>  
          <ControlLabel className="statuslbl">
            <input
            defaultChecked={!doc.status}
            type="radio"
            name="status"/>No
          </ControlLabel>            
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {doc && doc._id ? 'Save Changes' : 'Add Order'}
        </Button>
      </form>
    );
  }
}

DocumentEditor.defaultProps = {
  doc: { name: '', description: '', status: false },
};

DocumentEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default DocumentEditor;
