function roll(times, offset, top) {
  for (let i = 0; i < times; i++) {
    console.log(Math.random() * top + offset);
  }
}

roll(6, 0, 10);
