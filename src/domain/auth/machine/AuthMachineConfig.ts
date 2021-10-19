import { assign } from 'lodash';
import { MachineConfig } from 'xstate';
import { FormEvent } from '../../form/definition/FormEvents';
import { AuthContext } from '../definition/AuthContext';
import { AuthEvent, AuthEvents } from '../definition/AuthEvents';
import { AuthSchema, AuthStates } from '../definition/AuthSchema';

export const AuthMachineConfig: MachineConfig<AuthContext, AuthSchema, AuthEvent> = {
  id: 'auth',
  initial: AuthStates.SignIn,
  states: {
    [AuthStates.Register]: {
      entry: 'assignRegisterRef',
      on: {
        [AuthEvents.SignIn]: AuthStates.SignIn,
        [AuthEvents.Forgot]: AuthStates.Forgot
      }
    },
    [AuthStates.SignIn]: {
      entry: 'assignLoginRef',
      on: {
        [AuthEvents.Register]: AuthStates.Register,
        [AuthEvents.Forgot]: AuthStates.Forgot,
        [FormEvent.Validate]: {
          target: AuthStates.Authenticated,
          actions: 'assignToken'
        }
      }
    },
    [AuthStates.Forgot]: {
      on: {
        [AuthEvents.Register]: AuthStates.Register,
        [AuthEvents.Forgot]: AuthStates.Forgot
      }
    },
    [AuthStates.Authenticated]: {
      type: 'final'
    }
  }
};
