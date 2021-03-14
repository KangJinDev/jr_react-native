const pino = require("pino");

if (!("toJSON" in Error.prototype)) {
  // eslint-disable-next-line
  Object.defineProperty(Error.prototype, "toJSON", {
    value: function () {
      const alt = {};

      Object.getOwnPropertyNames(this).forEach(function (key) {
        alt[key] = this[key];
      }, this);

      return alt;
    },
    configurable: true,
    writable: true,
  });
}

let line = 0;
export const createLogger = (base, file) =>
  pino(
    {
      level: "info",
      mixin() {
        line += 1;
        return {
          line,
          service: "mike-backend",
        };
      },
    },
    pino.destination(1)
  ).child({ base, file });


