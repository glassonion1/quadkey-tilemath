const p = Math.PI / 180, T = (t) => t * p, d = (t) => t / p, g = (t, o, e) => {
  const n = Math.pow(2, e), s = t / n * 360 - 180, a = Math.atan(Math.sinh(Math.PI * (1 - 2 * o / n))), c = d(a);
  return { lng: s, lat: c };
}, x = (t, o, e) => {
  const n = [];
  for (let s = e; s > 0; s--) {
    let a = 0;
    const c = 1 << s - 1;
    t & c && a++, o & c && (a += 2), n.push(a);
  }
  return n.join("");
}, y = (t, o, e) => {
  const n = g(t, o, e), s = g(t + 1, o + 1, e);
  return { west: n.lng, south: s.lat, east: s.lng, north: n.lat };
}, P = (t) => {
  let o = 0, e = 0;
  const n = t.length;
  for (let s = n; s > 0; s--) {
    const a = 1 << s - 1;
    switch (t[n - s]) {
      case "0":
        break;
      case "1":
        o |= a;
        break;
      case "2":
        e |= a;
        break;
      case "3":
        o |= a, e |= a;
        break;
      default:
        throw new Error("Invalid Quadkey digit sequence.");
    }
  }
  return {
    tileX: o,
    tileY: e
  };
}, B = (t) => {
  const o = P(t);
  return y(o.tileX, o.tileY, t.length);
}, w = (t, o = 0, e = 0) => {
  const n = B(t), s = n.east - n.west, a = n.north - n.south;
  return { lng: n.west + s * o, lat: n.south + a * e };
}, b = -85.05112878, E = 85.05112878, f = -180, A = 180, I = (t, o, e) => Math.min(Math.max(t, o), e), k = (t, o) => {
  const n = Math.pow(2, o);
  return t <= 0 ? 0 : t >= 1 ? Math.trunc(n - 1) : Math.trunc(Math.floor((t + 1e-14) * n));
}, M = (t, o) => {
  const e = I(t, f, A), n = I(o, b, E);
  return [e, n];
}, u = (t, o, e) => {
  const [n, s] = M(t, o), a = (n + 180) / 360, c = Math.sin(s * Math.PI / 180), l = 0.5 - Math.log((1 + c) / (1 - c)) / (4 * Math.PI), i = k(a, e), r = k(l, e);
  return { tileX: i, tileY: r };
}, D = (t, o, e) => {
  const n = u(t, o, e);
  return x(n.tileX, n.tileY, e);
}, N = (t, o, e) => {
  const n = u(t, o, e);
  return y(n.tileX, n.tileY, e);
}, X = (t, o, e, n, s) => {
  const a = [], c = u(t, n, s), l = u(e, o, s);
  for (let i = c.tileX; i <= l.tileX; i++)
    for (let r = c.tileY; r <= l.tileY; r++)
      a.push(x(i, r, s));
  return a;
}, h = 6378137, L = (t, o) => {
  const [e, n] = M(t, o), s = h * T(e), a = h * Math.log(Math.tan(Math.PI * 0.25 + 0.5 * T(n)));
  return { x: s, y: a };
}, _ = (t, o) => {
  const e = d(t) / h, n = d(
    Math.PI * 0.5 - 2 * Math.atan(Math.exp(-o / h))
  ), [s, a] = M(e, n);
  return { lng: s, lat: a };
}, Q = {
  pointToQuadkey: D,
  pointToBoundingBox: N,
  quadkeyToPoint: w,
  quadkeyToBoundingBox: B,
  getQuadkeysInBoundingBox: X,
  pointToWebMercator: L,
  webMercatorToPoint: _
};
export {
  X as getQuadkeysInBoundingBox,
  N as pointToBoundingBox,
  D as pointToQuadkey,
  L as pointToWebMercator,
  B as quadkeyToBoundingBox,
  w as quadkeyToPoint,
  Q as tileMath,
  _ as webMercatorToPoint
};
