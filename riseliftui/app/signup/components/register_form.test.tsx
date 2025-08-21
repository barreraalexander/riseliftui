import { render, screen } from '@testing-library/react';
import {  describe, it, expect, vi } from 'vitest'

import RegisterForm from "./register_form";

/**
* @vitest-environment jsdom
*/


describe('Register', () => {

    it('render the component', async () => {
        // const { getByText } = render(<RegisterForm />); // Render the component
        
        await render(<RegisterForm />); // Render the component
        // const { getByText } = render(<RegisterForm />); // Render the component
    
        
    
        // ... (assertions)
      }); 


})
