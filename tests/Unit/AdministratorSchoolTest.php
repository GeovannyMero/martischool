<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\EscuelaController;

class AdministratorSchoolTest extends TestCase
{
    public function test_get_true_is_exist()
    {
        $escuela = new EscuelaController();
        //$all = $escuela->ExisteAdministrator("0931254569");
        $all = $escuela->guardarAdministradores();

        $this->assertEquals(true, $all);
    }
}
