/* */ 
"format esm";
import { provide, ReflectiveInjector } from 'angular2/core';
import { isBlank, isPresent } from 'angular2/src/facade/lang';
import { recognize } from './recognize';
import { equalSegments, routeSegmentComponentFactory, RouteSegment } from './segments';
import { hasLifecycleHook } from './lifecycle_reflector';
export class RouterOutletMap {
    constructor() {
        /** @internal */
        this._outlets = {};
    }
    registerOutlet(name, outlet) { this._outlets[name] = outlet; }
}
export class Router {
    constructor(_componentType, _componentResolver, _urlParser, _routerOutletMap) {
        this._componentType = _componentType;
        this._componentResolver = _componentResolver;
        this._urlParser = _urlParser;
        this._routerOutletMap = _routerOutletMap;
    }
    navigateByUrl(url) {
        let urlSegmentTree = this._urlParser.parse(url.substring(1));
        return recognize(this._componentResolver, this._componentType, urlSegmentTree)
            .then(currTree => {
            let prevRoot = isPresent(this.prevTree) ? this.prevTree.root : null;
            _loadSegments(currTree, currTree.root, this.prevTree, prevRoot, this, this._routerOutletMap);
            this.prevTree = currTree;
        });
    }
}
function _loadSegments(currTree, curr, prevTree, prev, router, parentOutletMap) {
    let outlet = parentOutletMap._outlets[curr.outlet];
    let outletMap;
    if (equalSegments(curr, prev)) {
        outletMap = outlet.outletMap;
    }
    else {
        outletMap = new RouterOutletMap();
        let resolved = ReflectiveInjector.resolve([provide(RouterOutletMap, { useValue: outletMap }), provide(RouteSegment, { useValue: curr })]);
        let ref = outlet.load(routeSegmentComponentFactory(curr), resolved, outletMap);
        if (hasLifecycleHook("routerOnActivate", ref.instance)) {
            ref.instance.routerOnActivate(curr, prev, currTree, prevTree);
        }
    }
    if (isPresent(currTree.firstChild(curr))) {
        let cc = currTree.firstChild(curr);
        let pc = isBlank(prevTree) ? null : prevTree.firstChild(prev);
        _loadSegments(currTree, cc, prevTree, pc, router, outletMap);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC05RDFpR1FWRy50bXAvYW5ndWxhcjIvc3JjL2FsdF9yb3V0ZXIvcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFvQixNQUFNLGVBQWU7T0FFckUsRUFBTyxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BRTFELEVBQUMsU0FBUyxFQUFDLE1BQU0sYUFBYTtPQUM5QixFQUFDLGFBQWEsRUFBRSw0QkFBNEIsRUFBRSxZQUFZLEVBQU8sTUFBTSxZQUFZO09BQ25GLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1QkFBdUI7QUFFdEQ7SUFBQTtRQUNFLGdCQUFnQjtRQUNoQixhQUFRLEdBQW1DLEVBQUUsQ0FBQztJQUVoRCxDQUFDO0lBREMsY0FBYyxDQUFDLElBQVksRUFBRSxNQUFvQixJQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1RixDQUFDO0FBRUQ7SUFFRSxZQUFvQixjQUFvQixFQUFVLGtCQUFxQyxFQUNuRSxVQUEyQixFQUFVLGdCQUFpQztRQUR0RSxtQkFBYyxHQUFkLGNBQWMsQ0FBTTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDbkUsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO0lBQUcsQ0FBQztJQUU5RixhQUFhLENBQUMsR0FBVztRQUN2QixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUM7YUFDekUsSUFBSSxDQUFDLFFBQVE7WUFDWixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNwRSxhQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUN0RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7QUFDSCxDQUFDO0FBRUQsdUJBQXVCLFFBQTRCLEVBQUUsSUFBa0IsRUFDaEQsUUFBNEIsRUFBRSxJQUFrQixFQUFFLE1BQWMsRUFDaEUsZUFBZ0M7SUFDckQsSUFBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbkQsSUFBSSxTQUFTLENBQUM7SUFDZCxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixTQUFTLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNsQyxJQUFJLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQ3JDLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEcsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0UsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7SUFDSCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUQsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0QsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb3ZpZGUsIFJlZmxlY3RpdmVJbmplY3RvciwgQ29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJPdXRsZXR9IGZyb20gJy4vZGlyZWN0aXZlcy9yb3V0ZXJfb3V0bGV0JztcbmltcG9ydCB7VHlwZSwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSb3V0ZXJVcmxQYXJzZXJ9IGZyb20gJy4vcm91dGVyX3VybF9wYXJzZXInO1xuaW1wb3J0IHtyZWNvZ25pemV9IGZyb20gJy4vcmVjb2duaXplJztcbmltcG9ydCB7ZXF1YWxTZWdtZW50cywgcm91dGVTZWdtZW50Q29tcG9uZW50RmFjdG9yeSwgUm91dGVTZWdtZW50LCBUcmVlfSBmcm9tICcuL3NlZ21lbnRzJztcbmltcG9ydCB7aGFzTGlmZWN5Y2xlSG9va30gZnJvbSAnLi9saWZlY3ljbGVfcmVmbGVjdG9yJztcblxuZXhwb3J0IGNsYXNzIFJvdXRlck91dGxldE1hcCB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX291dGxldHM6IHtbbmFtZTogc3RyaW5nXTogUm91dGVyT3V0bGV0fSA9IHt9O1xuICByZWdpc3Rlck91dGxldChuYW1lOiBzdHJpbmcsIG91dGxldDogUm91dGVyT3V0bGV0KTogdm9pZCB7IHRoaXMuX291dGxldHNbbmFtZV0gPSBvdXRsZXQ7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFJvdXRlciB7XG4gIHByaXZhdGUgcHJldlRyZWU6IFRyZWU8Um91dGVTZWdtZW50PjtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29tcG9uZW50VHlwZTogVHlwZSwgcHJpdmF0ZSBfY29tcG9uZW50UmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF91cmxQYXJzZXI6IFJvdXRlclVybFBhcnNlciwgcHJpdmF0ZSBfcm91dGVyT3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApIHt9XG5cbiAgbmF2aWdhdGVCeVVybCh1cmw6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB1cmxTZWdtZW50VHJlZSA9IHRoaXMuX3VybFBhcnNlci5wYXJzZSh1cmwuc3Vic3RyaW5nKDEpKTtcbiAgICByZXR1cm4gcmVjb2duaXplKHRoaXMuX2NvbXBvbmVudFJlc29sdmVyLCB0aGlzLl9jb21wb25lbnRUeXBlLCB1cmxTZWdtZW50VHJlZSlcbiAgICAgICAgLnRoZW4oY3VyclRyZWUgPT4ge1xuICAgICAgICAgIGxldCBwcmV2Um9vdCA9IGlzUHJlc2VudCh0aGlzLnByZXZUcmVlKSA/IHRoaXMucHJldlRyZWUucm9vdCA6IG51bGw7XG4gICAgICAgICAgX2xvYWRTZWdtZW50cyhjdXJyVHJlZSwgY3VyclRyZWUucm9vdCwgdGhpcy5wcmV2VHJlZSwgcHJldlJvb3QsIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXJPdXRsZXRNYXApO1xuICAgICAgICAgIHRoaXMucHJldlRyZWUgPSBjdXJyVHJlZTtcbiAgICAgICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2xvYWRTZWdtZW50cyhjdXJyVHJlZTogVHJlZTxSb3V0ZVNlZ21lbnQ+LCBjdXJyOiBSb3V0ZVNlZ21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgIHByZXZUcmVlOiBUcmVlPFJvdXRlU2VnbWVudD4sIHByZXY6IFJvdXRlU2VnbWVudCwgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwKTogdm9pZCB7XG4gIGxldCBvdXRsZXQgPSBwYXJlbnRPdXRsZXRNYXAuX291dGxldHNbY3Vyci5vdXRsZXRdO1xuXG4gIGxldCBvdXRsZXRNYXA7XG4gIGlmIChlcXVhbFNlZ21lbnRzKGN1cnIsIHByZXYpKSB7XG4gICAgb3V0bGV0TWFwID0gb3V0bGV0Lm91dGxldE1hcDtcbiAgfSBlbHNlIHtcbiAgICBvdXRsZXRNYXAgPSBuZXcgUm91dGVyT3V0bGV0TWFwKCk7XG4gICAgbGV0IHJlc29sdmVkID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmUoXG4gICAgICAgIFtwcm92aWRlKFJvdXRlck91dGxldE1hcCwge3VzZVZhbHVlOiBvdXRsZXRNYXB9KSwgcHJvdmlkZShSb3V0ZVNlZ21lbnQsIHt1c2VWYWx1ZTogY3Vycn0pXSk7XG4gICAgbGV0IHJlZiA9IG91dGxldC5sb2FkKHJvdXRlU2VnbWVudENvbXBvbmVudEZhY3RvcnkoY3VyciksIHJlc29sdmVkLCBvdXRsZXRNYXApO1xuICAgIGlmIChoYXNMaWZlY3ljbGVIb29rKFwicm91dGVyT25BY3RpdmF0ZVwiLCByZWYuaW5zdGFuY2UpKSB7XG4gICAgICByZWYuaW5zdGFuY2Uucm91dGVyT25BY3RpdmF0ZShjdXJyLCBwcmV2LCBjdXJyVHJlZSwgcHJldlRyZWUpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc1ByZXNlbnQoY3VyclRyZWUuZmlyc3RDaGlsZChjdXJyKSkpIHtcbiAgICBsZXQgY2MgPSBjdXJyVHJlZS5maXJzdENoaWxkKGN1cnIpO1xuICAgIGxldCBwYyA9IGlzQmxhbmsocHJldlRyZWUpID8gbnVsbCA6IHByZXZUcmVlLmZpcnN0Q2hpbGQocHJldik7XG4gICAgX2xvYWRTZWdtZW50cyhjdXJyVHJlZSwgY2MsIHByZXZUcmVlLCBwYywgcm91dGVyLCBvdXRsZXRNYXApO1xuICB9XG59Il19