import React from 'react';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderCard ({item, isLoading, errMess }) {
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return <h4>{errMess}</h4>;
    }

    return (
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard 
                    item={props.campsite} 
                    isLoading={props.campsitesLoading}
                    errMess={props.campsitesErrMess}
                    
                    />
                </div>
                <div className="col-md m-1">
                <RenderCard
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
            </div>
        </div>
    );
}

export default Home;