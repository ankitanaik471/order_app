import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import DocumentsCollection from '../../../api/Documents/Documents';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';

import './Documents.scss';

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};

const Documents = ({
  loading, documents, match, history,
}) => (!loading ? (
  <div className="Documents">
    <div className="page-header clearfix">
      <h4 className="pull-left">Order List</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Order</Link>
    </div>
    {documents.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Time Delivery</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {documents.map(({
            _id, name, status, description, createdAt, updatedAt,
          }) => (
            <tr key={_id}>
              <td>{name}</td>
              <td>{description}</td>
              <td>{String(status)}</td>
              <td>&nbsp;</td>
              <td>
                <Button
                  onClick={() => history.push(`${match.url}/${_id}/edit`)}
                  block
                >
                  <i className="fa fa-pencil-square"></i>
                </Button>
                <Button
                  onClick={() => handleRemove(_id)}
                  block
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </td>              
            </tr>
          ))}
        </tbody>
      </Table> : <Alert bsStyle="warning">No Orders</Alert>}
  </div>
) : <Loading />);

Documents.propTypes = {
  loading: PropTypes.bool.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('documents');
  return {
    loading: !subscription.ready(),
    documents: DocumentsCollection.find().fetch(),
  };
})(Documents);
