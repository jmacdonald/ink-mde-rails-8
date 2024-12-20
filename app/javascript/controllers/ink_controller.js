import { Controller } from "@hotwired/stimulus"
import { wrap } from "ink-mde";

export default class extends Controller {
  static targets = [ "textarea" ]

  connect() {
    wrap(this.textareaTarget);
  }
}
