
import { Enso, html, css, prop, watches, lifecycle } from 'ensojs';

import "../../components/refresh.enso";
import "../../components/card.enso";

import { decodeWeather, getWeather } from './api';

import CardStyles from "../../assets/styles/cards.css?inline";
import Reset from "../../assets/styles/reset.css?inline";


Enso.component('enso-weather', {
    watched: {
        weather: prop(null)
    },

    styles: [css(Reset), css(CardStyles), css`
        h2 {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 0.5em;
            border-bottom: 1px solid var(--border);

            font-size: 22px;
        }
    `],

    template: html`
        <enso-card class="card">
            <h2 slot="header">Weather</h2>

            <div>
                Temperature:
                {{ @:weather?.temperature ?? '--' }}°
            </div>

            <div>
                Code:
                {{ @:weather?.condition ?? '--' }}
            </div>

            <div>
                Day:
                {{ @:weather?.time ?? '--' }}
            </div>
        </enso-card>
    `,

    script: {
        refresh() {
            getWeather().then(
                data => {
                    this.weather = decodeWeather(data);
                }
            );
        },
        onStart: watches(function() {
            this.refresh();
        }, [lifecycle.mount], false)
    }
});

