export async function getSifts() {
  const siftData = await fetch('http://localhost:1337/siftTestData?apiKey=bdH0VGExAEIhPq0z5vwdyVuHVzWx0hcR');
  return siftData;
}
