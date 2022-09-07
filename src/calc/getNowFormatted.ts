function getNowFormatted() {
  const now = new Date();
  return (
    now.toLocaleDateString() +
    ' ' +
    now.toLocaleTimeString('default', {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
}

export default getNowFormatted;
