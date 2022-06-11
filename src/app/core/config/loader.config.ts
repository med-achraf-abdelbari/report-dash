import {NgxUiLoaderConfig, PB_DIRECTION, POSITION, SPINNER} from 'ngx-ui-loader';

export const lOADER_CONFIG: NgxUiLoaderConfig = {
    bgsColor: '#fff',
    fgsColor: '#ffd600',
    pbColor: '#ffd600',
    bgsPosition: POSITION.bottomCenter,
    bgsSize: 40,
    bgsType: SPINNER.chasingDots, // background spinner type
    fgsType: SPINNER.pulse, // foreground spinner type
    pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
    pbThickness: 7, // progress bar thickness
};