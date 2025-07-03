export enum LinkErrors {
  NOT_VALID_DATA = 'Data is not valid to be sent to the database',
  SUBMIT_ERROR = 'Error submiting link data in Database',
  DELETION_ERROR = 'Link deletion failed',
  QUERY_ERROR = 'Error fetching link data',
  UPDATE_ERROR = 'Error updating link data'
}

export enum TagErrors {
  NOT_VALID_DATA = 'Data is no valid to be sent to the database',
  SUBMIT_ERROR = 'Error submiting tag data in Database',
  ADD_TAGS_ERROR = 'Something went wrong adding tags to the created link',
  QUERY_ERROR = 'Error retrieving tags',
  UPDATE_ERROR = 'Error updating tags',
  DELETION_ERROR = 'Error deleting tag data'
}

export enum UserErrors {
  NOT_FOUND = 'User not found',
  DELETION_ERROR = 'Error deleting user data',
  UPDATE_ERROR = 'Error updating user data'
}

export enum SessionErrors {
  SESSION_NOT_FOUND = 'User session not found',
}
