import { Component, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: 'app-popover-content',
  templateUrl: './popover-content.component.html',
  styleUrls: ['./header.component.scss'],
})
export class PopoverContentComponent {
  @Input() userFullName: string = '';
  @Input() signout!: () => void;

  constructor(
    protected authService: AuthService,
    private popoverController: PopoverController // Inyectamos el PopoverController
  ) {}

  closePopover() {
    this.popoverController.dismiss();
  }

  handleSignout() {
    this.signout();
    this.closePopover();
  }
}