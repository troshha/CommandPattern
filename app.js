(function() {
  class Client {
    constructor() {}
    log(msg) {
      var c = document.getElementById("console"),
        li = document.createElement("li");
      li.innerHTML = msg;
      c.appendChild(li);
      console.log(msg);
    }
  }

  class Receiver {
    constructor() {
      this.data = 1;
      c.log("Data starts off with " + this.data);
    }
    increase() {
      this.data++;
      c.log("Increment. My data is now " + this.data);
    }
    decrease() {
      this.data--;
      c.log("Decrement. My data is now " + this.data);
    }
  }

  class Invoker {
    constructor() {
      this.undoActions = [];
      this.redoActions = [];
    }

    undo() {
      var action = this.undoActions.pop();
      if (action) {
        this.redoActions.push(action.opposite());
        c.log(`U have ${this.undoActions.length} actions to undo`);
        return action.run();
      } else {
        c.log("can't undo - no more actions");
      }
    }
    redo() {
      var action = this.redoActions.pop();
      if (action) {
        this.undoActions.push(action.opposite());
        c.log(`U have ${this.redoActions.length} actions to redo`);
        return action.run();
      } else {
        c.log("can't redo - no more actions");
      }
    }
    call(action) {
      this.undoActions.push(action);
      return action.run();
    }
  }

  class BaseCommand {
    constructor() {
      this.reverse = false;
    }
    run() {
      if (!this.reverse) {
        return this.forward();
      } else {
        return this.backward();
      }
    }
    opposite() {
      this.reverse = !this.reverse;
      return this;
    }
  }

  class ExampleCommand extends BaseCommand {
    forward() {
      r.increase();
    }
    backward() {
      r.decrease();
    }
  }

  var c = new Client();
  var r = new Receiver();
  var i = new Invoker();

  document.getElementById("call").addEventListener("click", function() {
    i.call(new ExampleCommand());
  });
  document.getElementById("undo").addEventListener("click", function() {
    i.undo();
  });
  document.getElementById("redo").addEventListener("click", function() {
    i.redo();
  });

  // i.undo();
  // i.undo();
  // i.redo();
  // i.redo();
  // i.redo();
})();
