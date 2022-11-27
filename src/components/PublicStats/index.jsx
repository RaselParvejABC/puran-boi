import React from 'react';
import { Stats } from 'react-daisyui';

const PublicStats = () => {
  return (
    <Stats className="shadow font-sans container mx-auto p-8">
      <Stats.Stat className="place-items-center">
        <Stat.Item variant="title">Downloads</Stat.Item>
        <Stat.Item variant="value">31K</Stat.Item>
        <Stat.Item variant="desc">From January 1st to February 1st</Stat.Item>
      </Stats.Stat>

      <Stats.Stat className="place-items-center">
        <Stat.Item variant="title">Users</Stat.Item>
        <Stat.Item variant="value" className="text-secondary">
          4,200
        </Stat.Item>
        <Stat.Item variant="desc" className="text-secondary">
          ↗︎ 40 (2%)
        </Stat.Item>
      </Stats.Stat>

      <Stats.Stat className="place-items-center">
        <Stat.Item variant="title">New Registers</Stat.Item>
        <Stat.Item variant="value">1,200</Stat.Item>
        <Stat.Item variant="desc">↘︎ 90 (14%)</Stat.Item>
      </Stats.Stat>
    </Stats>
  );
};

export default PublicStats;
