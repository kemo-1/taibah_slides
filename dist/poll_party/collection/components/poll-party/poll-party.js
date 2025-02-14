import { h, Host } from "@stencil/core";
import PartySocket from "partysocket";
import state from "./store";
import hash from "object-hash";
export class PollParty {
  constructor() {
    this.host = undefined;
    this.party = null;
    this.room = undefined;
    this.poll = undefined;
    this.votes = {};
    this.socket = undefined;
    this.selectedOption = null;
  }
  async componentWillLoad() {
    // Build the poll from elements in the DOM. There should be an
    // element called 'question' and a number of elements called 'option'.
    // Each option element has an id attr and a text node.
    const options = Object.fromEntries(Array.from(this.hostEl.querySelectorAll("option")).map((el) => [
      el.id,
      el.innerHTML,
    ]));
    const poll = {
      question: this.hostEl.querySelector("question").innerHTML,
      options,
    };
    this.poll = poll;
    this.room = hash(poll);
    this.socket = new PartySocket({
      host: this.host,
      party: this.party,
      room: this.room,
    });
    this.socket.addEventListener("message", async (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === "sync") {
        this.votes = msg.votes;
      }
    });
  }
  async componentDidLoad() {
    // Nothing
  }
  async submitVote(e) {
    console.log("submitting vote");
    e.preventDefault();
    //const formData = new FormData(e.target);
    //const option = formData.get("option") as string;
    const option = this.selectedOption;
    this.socket.send(JSON.stringify({
      type: "vote",
      option: option,
    }));
    // add this.name to state.hasVoted (a list)
    state.hasVoted = [...state.hasVoted, this.room];
    // Update the poll results locally. This will be overwritten when the socket
    // sends a sync message
    this.votes = Object.assign(Object.assign({}, this.votes), { [option]: (this.votes[option] || 0) + 1 });
    this.selectedOption = null;
  }
  async resetPoll() {
    // remove this.room from state.hasVoted (a list)
    state.hasVoted = state.hasVoted.filter((name) => name !== this.room);
  }
  render() {
    if (!this.poll) {
      return h("div", null, "Loading...");
    }
    const hasVoted = state.hasVoted.find((room) => room === this.room)
      ? true
      : false;
    const totalVotes = Object.values(this.votes).reduce((acc, curr) => acc + curr, 0);
    const maxVotes = Math.max(...Object.values(this.votes));
    return (h(Host, null, h("div", { class: "poll-party styled" }, h("header", null, h("h1", null, this.poll.question), h("div", { class: "total" }, totalVotes, " :\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0631\u062F\u0648\u062F")), hasVoted ? (h("div", { class: "results" }, h("table", null, Object.entries(this.poll.options).map(([option, desc]) => {
      const votes = this.votes[option] || 0;
      return (h("tr", null, h("td", null, desc), h("td", null, h("strong", null, votes)), h("td", null, h("div", { class: "bar" }, h("div", { class: "bar-inner", style: {
          width: `${(votes / maxVotes) * 100}%`,
        } })))));
    })))) : (h("form", { onSubmit: (e) => this.submitVote(e) }, h("div", { class: "options" }, Object.entries(this.poll.options).map(([option, desc]) => (h("label", null, h("input", { type: "radio", name: "option", value: option, onChange: () => {
        this.selectedOption = option;
      } }), desc)))), h("button", { type: "submit", disabled: this.selectedOption === null }, "\u0642\u0645 \u0628\u0627\u0644\u062A\u0635\u0648\u064A\u062A"))))));
  }
  static get is() { return "poll-party"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["poll-party.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["poll-party.css"]
    };
  }
  static get properties() {
    return {
      "host": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "host",
        "reflect": false
      },
      "party": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | null",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "party",
        "reflect": false,
        "defaultValue": "null"
      }
    };
  }
  static get states() {
    return {
      "room": {},
      "poll": {},
      "votes": {},
      "socket": {},
      "selectedOption": {}
    };
  }
  static get elementRef() { return "hostEl"; }
}
//# sourceMappingURL=poll-party.js.map
