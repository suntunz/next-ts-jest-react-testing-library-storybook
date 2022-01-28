import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Header from '../components/organisms/Header'

export default {
  title: 'Organisms/Header',
  component: Header
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  user: {
    id: 1
  }
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {}
