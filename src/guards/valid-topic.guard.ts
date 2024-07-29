import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class ValidTopicGuard implements CanActivate {
    private router = inject(Router);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

        if(route.params['topic-name'] === undefined) {
            // TODO: Must replace this hard-coded one
            // Adds some complexity, handle it.
            this.router.navigate(['/topic/arrays'])
        }

        // TODO: check if the topic  in the path really exists in backend data or not.
        // if exists then good.
        // if it doesn't exist, 
            // 1. If you have the backend data then take the user to the first topic route(later extennd it to take the user back to last visited topic)
            // 2. If no backend data, make ProblemsComponent display - No data.

        // In all the cases, we always return true.
        // We will update the state here to any subject or a signal.
        // We will let the ProblemsComponent to decide on what to display.
        return true;

    }
}