/**
 * Enum for the return status of creating a new user.
 * @index S000-S099 : New user was created successfully.
 * @index S100-S199 : An error occured while creating the new user.
 * @index S200-S299 : The provided user data is invalid.
 */
enum SignupStatus {
  Success = 'S000',
  SuccessNoSession = 'S001',
  Failed = 'S100',
  FailedDBStore = 'S101',
  InvalidRequest = 'S200',
  InvalidEmail = 'S201',
}

export default SignupStatus
