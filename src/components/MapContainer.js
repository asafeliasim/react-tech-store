import React,{Component} from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import axios from 'axios';
class MapContainer extends Component {
    state= {
        coordinates: [
                /*
                  {
                    longitude:
                    latitude:
                  }
                    */
                ]
        };


     async componentDidMount(){
       const branches = await axios.get('http://localhost:3001/branches');
       branches.data.map( async branch =>{
          let coordinates = await axios.get(`http://localhost:3001/geocode/${branch.address}`);
          let obj = {
              longitude: coordinates.data.longitude,
              latitude: coordinates.data.latitude
          };
          console.log(obj);
          this.setState({
              coordinates:[...this.state.coordinates,obj]
          })
       });
     };
    getUniqueCountries(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }
    render() {

        const unique = this.getUniqueCountries(this.state.coordinates, 'country');

        const countriesTags = unique.map((c, index) => (
            <div key={index} className="field is-grouped is-grouped-multiline">
                <div className="control">
                    <div className="tags has-addons">
                        <span className="tag is-dark">{c.country}</span>
                        <span className="tag is-outlined">{c.counter}</span>
                    </div>
                </div>
            </div>
        ));

        const markerTemplate = this.state.coordinates.map((c, index) =>
            <Marker
                key={index}
                title={c.country}
                name={c.country}
                position={{ lat: c.longitude, lng: c.latitude }}
            />
        );
        return(
            <>
               <div className="box map-box">
                   <div className="container">
                        <p className="menu-label">Legend:</p>
                       {countriesTags}
                   </div>
               </div>
                <Map google={this.props.google}
                zoom={4}
                initialCenter={{
                    lat: 39.04105295,
                    lng: 17.15858459
                }}
                >
                {markerTemplate}
                </Map>
            </>
        )
    }


}

export default MapContainer;
