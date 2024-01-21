import * as React from 'react';
import { WeatherData } from './interfaces/weatherData';
import { DocumentCard } from '@fluentui/react';
import * as moment from 'moment';
import { Image } from '@fluentui/react/lib/Image';
const DAY_NAMES: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface WeatherComponentProps {
    data: WeatherData[];
}

export class WeatherForecastComponent extends React.Component<WeatherComponentProps> {
    
    render() {
        return (
            <div >
                  <h2>Weather Forecast App: Sarajevo</h2>
                 
               <div className='forecast-grid'>
               {
                    this.props.data.map((item,index)=>(
                        <DocumentCard className='forecast-card' key={index}>
                            <h3 className='mt-10'> {this.getDayName(item.date)}</h3>
                            <p className='font-weight-100'>{moment(item.date).format('MM/DD/yyyy')}</p>
                            <div className='image-container'>                         
                            <Image src={item.image} />
                            </div>
                        <h3>{~~item.temperature}&deg;C</h3>
                        <p className='font-weight-100'>{item.description}</p>
                        </DocumentCard>
                    ))
                }
               </div>

            </div>
        );
    }

     getDayName = (dateString: string): string => {
        const date=new Date(dateString);
        return DAY_NAMES[date.getDay()]; 
      };    
}
