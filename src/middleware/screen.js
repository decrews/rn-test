function screenMiddleware({ getState }) {
  return (next) => (action) => {
    return next(action);
  };
}
