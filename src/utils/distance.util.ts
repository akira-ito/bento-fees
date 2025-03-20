import { Coordinates } from 'src/core/delivery-fees/entities/delivery-fee-request.entity';
import { Point } from 'typeorm';

export function coordinatesToPoints(coordinates: Coordinates): Point {
  return {
    type: 'Point',
    coordinates: [coordinates.lat, coordinates.lng],
  };
}
