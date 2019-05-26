(function() {
  function Client() {
    this.log = function(msg) {
      var c = document.getElementById("console"),
        li = document.createElement("li");
      li.innerHTML = msg;
      c.appendChild(li);
      console.log(msg);
    };
  }

  function Receiver() {
    this.data = 1;
    c.log("Data starts off with " + this.data);
    this.increase = function() {
      this.data++;
      c.log("Increment. My data is now " + this.data);
    };
    this.decrease = function() {
      this.data--;
      c.log("Decrement. My data is now " + this.data);
    };
  }

  function Invoker() {
    this.undoActions = [];
    this.redoActions = [];
    this.undo = function() {
      var action = this.undoActions.pop();
      if (action) {
        this.redoActions.push(action.opposite());
        c.log(`U have ${this.undoActions.length} actions to undo`);
        return action.run();
      } else {
        c.log("can't undo - no more actions");
      }
    };
    this.redo = function() {
      var action = this.redoActions.pop();
      if (action) {
        this.undoActions.push(action.opposite());
        c.log(`U have ${this.redoActions.length} actions to redo`);
        return action.run();
      } else {
        c.log("can't redo - no more actions");
      }
    };
    this.call = function(action) {
      this.undoActions.push(action);
      return action.run();
    };
  }

  function BaseCommand() {
    this.reverse = false;
  }
  BaseCommand.prototype.run = function() {
    if (!this.reverse) {
      return this.forward();
    } else {
      return this.backward();
    }
  };
  BaseCommand.prototype.opposite = function() {
    this.reverse = !this.reverse;
    return this;
  };

  ExampleCommand.prototype = new BaseCommand();
  ExampleCommand.prototype.constructor = ExampleCommand;

  function ExampleCommand() {}

  ExampleCommand.prototype.forward = function() {
    r.increase();
  };
  ExampleCommand.prototype.backward = function() {
    r.decrease();
  };

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
