'use strict'
import React, {Component} from 'react';
import * as Config from './config';
import AppData from "../data/AppData";

export default class APIService extends React.Component {
    static async get(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': Config.HEADER_TYPE,
                'Cookie': await AppData.getCookie(),
                'X-CSRFToken': await AppData.getToken()
            }
        });
    }

    static async post(url, body) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': Config.HEADER_TYPE,
                // 'Cookie': await AppData.getCookie(),
                // 'X-CSRFToken': await AppData.getToken()
            },
            body: JSON.stringify(body)
        });
    }
}